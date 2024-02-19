import { useEffect, useState } from "react"
import * as Contacts from 'expo-contacts';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// npx expo install expo-contacts
const ContactsView = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields : [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
                });

                if (data.length > 0) {
                    setContacts(data)
                }
            }
        })();
    },[]);

    const handleCall = (phoneNumbers) => {
        Linking.openURL(`tel:${phoneNumbers}`);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>내 연락처</Text>
            <FlatList
                data={contacts}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCall(item.phoneNumbers[0].number)}>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                                <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default ContactsView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contactItem: {
        marginBottom: 10,
        borderWidth:2
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 16,
    },
});