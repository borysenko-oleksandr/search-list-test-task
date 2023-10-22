import React, { memo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainScreens, MainStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useStyles from "../../../helpers/hooks/useStyles";
import Theme from "../../../types/styles";
import Price from "../../../components/Price";

interface Props {
  uri?: string;
  title: string;
  id: string;
  author: string;
  price: string;
}

const Card: React.FC<Props> = ({ uri, title, id, price, author }) => {
  const [loading, setLoading] = useState(true);
  const styles = useStyles(style);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handlePress = () => navigate(MainScreens.DETAILS, { id });
  const handleLoad = () => setLoading(false);

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          onLoadEnd={handleLoad}
          source={{
            uri,
          }}
        />
        {loading && <ActivityIndicator size="small" style={styles.loading} />}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.author}>{author}</Text>
            <Price price={price} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(Card);

const style = (theme: Theme) =>
  StyleSheet.create({
    loading: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 100,
    },
    card: {
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    container: {
      borderRadius: 20,
      backgroundColor: theme.colors.white,

      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2.22,

      elevation: 3,
    },
    image: {
      resizeMode: "contain",
      minWidth: "70%",
      minHeight: 300,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    textContainer: {
      minHeight: 38,
      paddingHorizontal: 8,
      marginHorizontal: 8,
      marginVertical: 8,
      justifyContent: "center",
      backgroundColor: theme.colors.white,
      borderRadius: 8,
    },
    title: {
      fontWeight: "700",
      fontSize: theme.fontSize.big,
    },
    author: {
      fontWeight: "500",
      fontSize: theme.fontSize.medium,
    },
    bottomTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      marginBottom: 8,
    },
  });
