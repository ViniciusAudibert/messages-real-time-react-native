import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { api } from '../../services/api'
import { io } from 'socket.io-client'

import { Message, MessageProps } from '../Message'

import { styles } from './styles'

const messagesQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messagens, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    async function fetchMessages() {
      const response = await api.get<MessageProps[]>('messages/last3')
      setMessages(response.data)
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length) {
        setMessages((prevState) => [messagesQueue[0], prevState[0], prevState[1]])
        messagesQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="never">
      {messagens.map((messagen) => (
        <Message key={messagen.id} data={messagen} />
      ))}
    </ScrollView>
  )
}
