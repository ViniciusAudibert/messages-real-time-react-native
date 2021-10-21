import React from 'react'

import { Text, View } from 'react-native'
import { MotiView } from 'moti'
import { UserPhoto } from '../UserPhoto'

import { styles } from './styles'

export interface MessageProps {
  id: string
  text: string
  user: {
    name: string
    avatar_url: string
  }
}

interface Props {
  data: MessageProps
}

export function Message(props: Props) {
  const { text, user } = props.data
  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
    >
      <Text style={styles.message}>{text}</Text>

      <View style={styles.footer}>
        <UserPhoto sizes="SMALL" imageUri={user.avatar_url} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
    </MotiView>
  )
}
