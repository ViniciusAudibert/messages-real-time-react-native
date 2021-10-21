import React, { useState } from 'react'
import { Alert, Keyboard, TextInput, View } from 'react-native'
import { api } from '../../services/api'
import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleMessageSubmit() {
    const messageFormatted = message.trim()

    if (messageFormatted.length === 0) {
      Alert.alert('Escreva uma mensagem para enviar')
    } else {
      setSendingMessage(true)
      await api.post('messages', { message: messageFormatted })

      setMessage('')
      Keyboard.dismiss()
      setSendingMessage(false)

      Alert.alert('Mensagem enviada com sucesso!')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        maxLength={140}
        editable={!sendingMessage}
        multiline
      />
      <Button color={COLORS.WHITE} backgroundColor={COLORS.PINK} isLoading={sendingMessage} onPress={handleMessageSubmit}>
        ENVIAR MENSAGEM
      </Button>
    </View>
  )
}
