import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, ColorValue, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { styles } from './styles'

interface Props extends TouchableOpacityProps {
  children: string
  color: ColorValue
  backgroundColor: ColorValue
  icon?: React.ComponentProps<typeof AntDesign>['name']
  isLoading: boolean
}

export function Button(props: Props) {
  const { children, color, backgroundColor, icon, isLoading, ...rest } = props

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {icon && <AntDesign name={icon} size={24} style={styles.icon} />}
          <Text style={[styles.title, { color }]}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  isLoading: false,
}
