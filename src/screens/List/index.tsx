import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { MainScreens, MainStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchList, fetchMoreList } from "../../redux/reducers/list";
import Card from "./Card";
import { Item, State } from "../../types/redux";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedHeader from "../../components/AnimatedHeader";
import useStyles from "../../helpers/hooks/useStyles";
import Theme from "../../types/styles";
import { debounce } from "lodash";

type Props = NativeStackScreenProps<MainStackParamList, MainScreens.LIST>;

const List: React.FC<Props> = () => {
  const styles = useStyles(style);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const list = useSelector((state: State) => state.list.items);
  const total = useSelector((state: State) => state.list.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList("")).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleOnChange = (text: string) => {
    setSearchValue(text);
    const fetch = debounce(() => {
      return dispatch(fetchList(text));
    }, 400);
    fetch();
  };

  const renderItem = useCallback(({ item }: { item: Item }) => {
    return (
      <Card
        id={item?.id}
        uri={item?.firstPreviewImage?.watermarked}
        title={item?.title}
        author={item?.author?.details?.publicName}
        price={item?.price}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Item) => {
    return item?.id;
  }, []);

  const onEndReached = useCallback(() => {
    if (total === list.length) {
      return null;
    }
    dispatch(fetchMoreList());
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={styles.loading.color}
      />
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <AnimatedHeader
        headerText="List"
        data={list as Item[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        hasNextPage={total !== list.length}
      >
        <TextInput
          style={styles.input}
          onChangeText={handleOnChange}
          value={searchValue}
          placeholder="Search..."
        />
      </AnimatedHeader>
    </SafeAreaView>
  );
};

export default List;

const style = (theme: Theme) =>
  StyleSheet.create({
    loading: {
      flex: 1,
      color: theme.colors.gray,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.skeleton,
      marginTop: 10,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
      fontSize: theme.fontSize.medium,
      backgroundColor: theme.colors.white,

      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.22,

      elevation: 1,
    },
  });
