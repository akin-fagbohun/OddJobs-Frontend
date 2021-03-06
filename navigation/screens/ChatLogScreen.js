import * as React from 'react';
import {
  Button,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { SocketContext } from '../../App';
import { SetNotificationContext } from '../../App';
import { SetAllMessagesContext } from '../../App';
import { AllMessagesContext } from '../../App';
import {setNotificationState} from '../../utils.js';
import { useIsFocused } from '@react-navigation/native';


export const ChatLogScreen = ({ navigation }) => {
  const loginState = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const setNotifications = useContext(SetNotificationContext);
  const isFocused = useIsFocused();
  const messages = useContext(AllMessagesContext);
  const setMessages = useContext(SetAllMessagesContext);

  return (
    <>
      <View style={styles.container}>

        {messages &&
          messages.map((message, i) => {
            const boxColour = i % 2 ? '#FFEDDF90' : '#FEC89990';

            return (
              <Pressable
                key={message.user.fullName}
                style={({ pressed }) => [
                  styles.conversation_container,
                  { backgroundColor: pressed ? '#FEC899' : boxColour },
                ]}
                onPressOut={() => {

                  navigation.navigate('Chat', {
                    screen: 'JobChatScreen',
                    title: '',
                    params: { messageId: message._id },
                  });

                  if (message.unread > 0){
                    setNotificationState(setNotifications, -1, false);
                    message.unread = 0;
                  }
                }}>
                <View>
                  <Text style={styles.chatName}>{message.user.fullName}</Text>
                  <Text style={styles.username}>{message.user.username}</Text>
                </View>
                {message.unread > 0 && (
                  <Text style={styles.unread}>{message.unread}</Text>
                )}
              </Pressable>
            );
          })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttons_login: {
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
  },
  conversation_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#000',
    width: '98%',
    marginVertical: 2,
    paddingLeft: 10,
    minHeight: 70,
    borderRadius: 5,
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  unread: {
    height: 30,
    width: 30,
    color: '#FFF',
    backgroundColor: '#DC143C',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 50,
  },
});
