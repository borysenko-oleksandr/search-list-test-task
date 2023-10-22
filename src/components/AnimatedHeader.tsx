import React, { useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import useStyles from "../helpers/hooks/useStyles";
import Theme from "../types/styles";
import { Item } from "../types/redux";
import { ListRenderItem } from "@react-native/virtualized-lists";

interface Props {
  headerText: string;
  children: React.ReactNode;
  data: Item[] | [];
  renderItem: ListRenderItem<Item>;
  keyExtractor: (item: Item, index: number) => string;
  onEndReached: () => void;
  hasNextPage?: boolean;
}

const NativeAnimationHeader: React.FC<Props> = ({
  headerText,
  children,
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  hasNextPage,
}) => {
  const styles = useStyles(style);
  const translateY = useSharedValue(0);

  const titleAnimationStyle = useAnimatedStyle(() => {
    const y = interpolate(
      translateY.value,
      [10, 100],
      [0, -65],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateY.value,
      [0, 100],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: y }],
    };
  });

  const littleTitleAnimationStyle = useAnimatedStyle(() => {
    const y = interpolate(
      translateY.value,
      [50, 100],
      [-20, 10],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateY.value,
      [50, 100],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: y }],
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const renderFooter = useCallback(() => {
    if (hasNextPage) {
      return <ActivityIndicator size="small" style={styles.loading} />;
    }

    return null;
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.textContainer, titleAnimationStyle]}>
        <Text style={styles.text}>{headerText}</Text>
        {children}
      </Animated.View>
      <Animated.View
        style={[styles.littleTitleContainer, littleTitleAnimationStyle]}
      >
        <Text style={styles.littleTitle}>{headerText}</Text>
      </Animated.View>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default NativeAnimationHeader;

const style = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    textContainer: {
      marginHorizontal: 16,
      position: "absolute",
      zIndex: 1,
      width: "90%",
    },
    backButton: {
      fontSize: theme.fontSize.title,
      fontWeight: "700",
      color: theme.colors.black,
    },
    text: {
      fontSize: 22,
      fontWeight: "500",
      color: theme.colors.text,
    },
    littleTitle: {
      fontSize: theme.fontSize.medium,
      fontWeight: "500",
      color: theme.colors.text,
      textAlign: "center",
    },
    littleTitleContainer: {
      position: "absolute",
      width: "40%",
      alignSelf: "center",
      zIndex: 1,
      backgroundColor: theme.colors.whiteTransparent,
      padding: 5,
      borderRadius: 30,

      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2.22,

      elevation: 3,
    },
    flatlist: {
      paddingTop: 100,
    },
    loading: {
      marginBottom: 25,
    },
  });
