import React from 'react'
import { Text, View } from 'react-native'
import { useAuth } from '../../hooks/auth'
import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function SignInBox() {
  const { signIn, isLoading } = useAuth()

  return (
    <View style={styles.container}>
      <Text>tesss</Text>
      <Button color={COLORS.BLACK_PRIMARY} backgroundColor={COLORS.YELLOW} icon="github" onPress={signIn} isLoading={isLoading}>
        Entrar com Github
      </Button>
    </View>
  )
}
