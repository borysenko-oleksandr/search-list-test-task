import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, MainStackParamList } from "../../navigation/types";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { State } from "../../types/redux";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStyles from "../../helpers/hooks/useStyles";
import Theme from "../../types/styles";
import { Orientation } from "../../helpers/hooks/useOrientationListener";
import Price from "../../components/Price";

type Props = NativeStackScreenProps<MainStackParamList, MainScreens.DETAILS>;

const Detail: React.FC<Props> = ({ route }) => {
  const styles = useStyles(style);
  const [loading, setLoading] = useState(true);
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const id = route?.params?.id;

  const item = useSelector((state: State) =>
    state.list.items?.find((it) => it?.id === id)
  );

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={goBack}
        style={[styles.backButton, { top: top + 15 }]}
      >
        <Text style={styles.backText}>{`Back`}</Text>
      </Pressable>
      <View style={[styles.itemContainer, { marginTop: top + 50 }]}>
        <Image
          source={{ uri: item?.firstPreviewImage?.watermarked }}
          style={styles.image}
          onLoadEnd={handleLoading}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.author}>{item?.author.details.publicName}</Text>
          <Price price={item?.price} />
        </View>
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={styles.loading.color}
        />
      )}
    </View>
  );
};

export default Detail;

const style = (theme: Theme, orientation: Orientation) =>
  StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: orientation === Orientation.LANDSCAPE ? "row" : "column",
    },
    backButton: {
      position: "absolute",
      backgroundColor: theme.colors.whiteTransparent,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginLeft: 16,
      zIndex: 2,
      borderRadius: 25,

      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2.22,

      elevation: 3,
    },
    wrapper: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 16,
    },
    image: {
      minHeight: orientation === Orientation.LANDSCAPE ? null : "50%",
      minWidth: orientation === Orientation.LANDSCAPE ? "50%" : null,
      resizeMode: "contain",
    },
    loading: {
      flex: 1,
      color: theme.colors.gray,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    backText: {
      fontWeight: "700",
      fontSize: theme.fontSize.medium,
      color: "black",
    },
    title: {
      fontWeight: "700",
      fontSize: theme.fontSize.big,
      marginBottom: 16,
    },
    author: {
      fontWeight: "500",
      fontSize: theme.fontSize.medium,
      marginBottom: 8,
    },
    textContainer: {
      marginTop: 25,
      maxWidth: orientation === Orientation.LANDSCAPE ? "50%" : "100%",
    },
  });
