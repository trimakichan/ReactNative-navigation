import { useRoute, useNavigation } from '@react-navigation/native'
import {View, Text, Button} from 'react-native'
import TweetContent from '../../components/TweetContent';
import { useLayoutEffect } from 'react';


export default function TweetDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: params.tweet.author.name
        })
    }, [])

    return (
        <View style={{flex: 1}}>
            <Button title='Go back' onPress={() => navigation.goBack()}/>
            <TweetContent tweet={params.tweet} />
        </View>
    )
}