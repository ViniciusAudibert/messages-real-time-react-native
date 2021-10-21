import React from 'react'
import { Image, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../theme'
import avatarImg from '../../assets/avatar.png'

import { styles } from './styles'

const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28,
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42,
  },
}

interface Props {
  imageUri?: string
  sizes?: keyof typeof SIZES
}

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri

export function UserPhoto(props: Props) {
  const { imageUri, sizes } = props
  const { avatarSize, containerSize } = SIZES[sizes || 'NORMAL']

  return (
    <View>
      <LinearGradient
        colors={[COLORS.PINK, COLORS.YELLOW]}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.container, { width: containerSize, height: containerSize, borderRadius: containerSize / 2 }]}
      >
        <Image
          source={{ uri: imageUri || AVATAR_DEFAULT }}
          style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
        />
      </LinearGradient>
    </View>
  )
}
