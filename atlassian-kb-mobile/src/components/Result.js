import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import JiraScreen from './Jira';
import ConfluenceScreen from './Confluence';
import BitbucketScreen from './Bitbucket';

// Tab Navigator
const TabNavigator = createBottomTabNavigator({
    Jira: JiraScreen,
    Confluence: ConfluenceScreen,
    Bitbucket: BitbucketScreen,
});

export default createAppContainer(TabNavigator);