import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Theme from "../types/styles";
import useStyles from "../helpers/hooks/useStyles";

interface Props {
  price?: string;
}

const Price: React.FC<Props> = ({ price }) => {
  const styles = useStyles(style);
  return (
    <View style={styles.priceContainer}>
      <Text style={styles.price}>{price}€</Text>
    </View>
  );
};

export default Price;

const style = (theme: Theme) =>
  StyleSheet.create({
    priceContainer: {
      backgroundColor: theme.colors.skeleton,
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 8,
      width: 70,
    },
    price: {
      fontWeight: "500",
      fontSize: theme.fontSize.medium,
      textAlign: "center",
    },
  });
