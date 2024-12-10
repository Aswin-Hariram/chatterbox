import { StyleSheet, TextInput, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CommonStyles } from '../Components/CommonStyles';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { fserv } from '../services/firebaseService';
import { Colors } from '../Colors';
import ListItem from '../Components/ListItem';

const AddFriend = ({ usrData }) => {
    const [allUsers, setAllUsers] = useState([]); // State to hold all users
    const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered users based on search
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // State to manage the refreshing indicator
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

    // Fetch users from Firestore
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersSnapshot = await getDocs(collection(fserv.db, "User"));
            const usersData = [];

            for (const userDoc of usersSnapshot.docs) {
                const data = userDoc.data();

                // Skip current user
                if (data.email !== fserv.mauth.currentUser.email) {
                    // Get friend's document
                    const docRef = doc(fserv.db, `User/${fserv.mauth.currentUser.uid}/Friends/${userDoc.id}`);
                    const snap = await getDoc(docRef);

                    let friend_status = "";
                    if (snap.exists()) {
                        if (snap.get("type") === "Sent") {
                            friend_status = "sent";
                        } else if (snap.get("type") === "Received" && snap.get("status") === false) {
                            friend_status = "rec";
                        }
                    }

                    usersData.push({
                        id: userDoc.id,
                        friend: friend_status,
                        ...data,
                    });
                }
            }

            // Sort users alphabetically by username
            usersData.sort((a, b) => a.username.localeCompare(b.username));
            setAllUsers(usersData); // Set all users
            setFilteredUsers(usersData); // Initially show all users
            setLoading(false);
            setRefreshing(false); // Stop refreshing animation
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
            setRefreshing(false); // Stop refreshing animation in case of error
        }
    };

    // Filter users based on the search query
    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query.trim() === '') {
            // If search query is empty, show all users
            setFilteredUsers(allUsers);
        } else {
            // Filter users based on username
            const filtered = allUsers.filter(user =>
                user.username.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true); // Trigger refreshing animation
        fetchUsers(); // Fetch users again
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={CommonStyles.inputContainer}>
                <TextInput
                    placeholder="Search by name"
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={handleSearch} // Handle search input
                />
                <Ionicons
                    style={styles.searchIcon}
                    name="search"
                    size={24}
                    color={Colors.secondary}
                />
            </View>
            {loading && <ActivityIndicator size={'large'} />}

            {!loading && (
                <FlatList
                    style={{ marginTop: 15 }}
                    data={filteredUsers} // Display filtered users
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ListItem item={item} usrData={usrData} />}
                    refreshing={refreshing} // Trigger refresh indicator
                    onRefresh={handleRefresh} // Pull to refresh callback
                />
            )}
        </SafeAreaView>
    );
};

export default AddFriend;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 30,
        backgroundColor: Colors.bg,
    },
    input: {
        padding: 5,
        fontSize: 18,
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
    },
});
