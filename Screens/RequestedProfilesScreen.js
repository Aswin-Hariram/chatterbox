import {
    ActivityIndicator,
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { fserv } from '../services/firebaseService';
import RequestList from '../Components/RequestList';
import { Colors } from '../Colors';

const RequestedProfilesScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [reqData, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRequestsRealtime = () => {
        setLoading(true);

        try {
            const ref = collection(fserv.db, `/User/${fserv.mauth.currentUser.uid}/Friends`);
            const q = query(
                ref,
                where("type", '==', 'Sent'),
                where("status", '==', false),
                where("read", '==', 'read')
            );

            // Real-time listener
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const usersData = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const createdTime = doc.get("time") ? doc.get("time").toMillis() : 0; // Convert timestamp to milliseconds
                    return {
                        id: doc.id,
                        created: createdTime, // Use milliseconds for sorting
                        ...data,
                    };
                });

                // Sort by timestamp (created time) in descending order
                usersData.sort((a, b) => b.created - a.created);

                setData(usersData);
                setLoading(false);
            });

            return unsubscribe; // Unsubscribe from the listener on unmount
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = fetchRequestsRealtime();

        return () => {
            if (unsubscribe) unsubscribe(); // Clean up the listener
        };
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        setRefreshing(false); // No need to manually fetch, since it's real-time
    };

    if (reqData.length === 0) {
        return (
            <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', marginLeft: 25, marginTop: Platform.OS === 'ios' ? 10 : 50, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Sent Request</Text>
                </View>
                <Text style={{ textAlign: 'center', fontWeight: 'condensed', fontSize: 14, marginTop: 300 }}>No request found</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', marginLeft: 25, marginTop: Platform.OS === 'ios' ? 10 : 50, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Sent Request</Text>
            </View>

            {loading && <ActivityIndicator style={{ marginTop: 15 }} size="large" />}
            {!loading && reqData && (
                <FlatList
                    data={reqData} // Already sorted by timestamp
                    keyExtractor={(item) => item.id}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    renderItem={({ item }) => (
                        <RequestList
                            data={item}
                            allData={reqData}
                            setAllData={setData} // Pass setData to allow updates
                        />
                    )}
                />
            )}

        </SafeAreaView>
    );
};

export default RequestedProfilesScreen;

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 10 },
    header: { fontSize: 24, fontWeight: 'condensedBold', marginBottom: 20, color: 'black', textAlign: 'center' },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    avatarContainer: { position: 'relative' },
    avatar: { width: 65, height: 65, borderRadius: 50, marginRight: 10 },
    onlineBadge: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
        position: 'absolute',
        bottom: 0,
        right: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    textContainer: { flex: 1 },
    name: { fontWeight: 'bold', color: 'black', fontSize: 15 },
    message: { color: '#7D7D7D' },
    time: { color: Colors.primary, fontSize: 15 },
});
