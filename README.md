# react-native-swipeable-container

## Description

This module includes information on how to animate views in  **React Native** .

The package is compatible with both **Android** and **iOS** .



<img width="393" src="https://github.com/houssemELbahri/madeInQatar/blob/main/src/DATA/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-05-03%20at%2012.20.42.png">



## Getting Started
### Install the package:

Using `npm`:

```
$ npm install react-native-swipeable-container
```

Using `Yarn`:

```
$ yarn add react-native-swipeable-container
```
### Dependencies:
This library needs these dependencies to be installed in your project before you can use it:

Using `npm`:

```
$ npm install react-native-reanimated react-native-gesture-handler
```

Using `Yarn`:

```
$ yarn add react-native-reanimated react-native-gesture-handler
```

### Usage 🚀
Basic usage examples of the library


### Importing the `SwipeableView` component

```javascript
import { SwipeableView } from 'react-native-swipeable-container';
```

### Use the  `SwipeableView`  component in your app:

```javascript
<SwipeableView
    onDelete={() => Alert.alert('from delete button')}
    onEdit={() => Alert.alert('from edit button')}
    deleteButton={DeleteButton}
    editButton={EditButton}
>
  {Content}
</SwipeableView>
```

## Some Code Examples

```javascript

 const Content = (
        <View style={{
            flex: 1,
            backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>Customize your design</Text>
        </View>
    )
 
 const DeleteButton = (
    <View style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Text style={{color:'white'}}>D</Text>
    </View>
)


const EditButton = (
    <View style={{
        backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
    }}>
        <Text style={{color:'white'}}>E</Text>
    </View>
)

const deleteAction = () => {
    Alert.alert('from pressing delete button')
}

const editAction = () => {
  Alert.alert('from pressing edit button')
}

<SwipeableView
    deleteButton={DeleteButton}
    editButton={EditButton}
    onDelete={deleteAction}
    onEdit={editAction}
>
  {Content}
</SwipeableView>
```


## Props
| Prop                               | Description                                                                                                                                                                                                                                                                                                          
| -----------------------------------| -------------------------------------------------------------------------------------------------------------------|
| `children`                         | The content to be rendered inside the SwipeableView.                                                               |  
| `deleteButton`                     | The content of the delete button.                                                                                  |
| `editButton`                       | The content of the edit button.                                                                                    |
| `height`                           | Optional. Height of the container.                                                                                 |
| `width`                            | Optional. Width of the container.                                                                                  |
| `swipeable`                        | Boolean indicating if the container should be swipeable.                                                           |
| `swipeableHint`                    | Boolean indicating if container swipe on the first render .                                                        |
| `swipeToDelete`                    | Optional. Determines whether swiping should trigger the delete action. Default is false .                           |
| `deleteThreshold`                  | Optional. The threshold for triggering delete action when swiping . Default is 210.                                |
| `autoOpened`                       | Boolean indicating if modal should be opened automatically.                                                        |
| `bg`                               | The color of the hidden view.                                                                                      |
| `borderRadius`                     | Optional. The border radius of the SwipeableView container. Default is 0.                                          |
| `marginTop`                        | Optional. The margin from the top.                                                                                 |
| `marginBottom`                     | Optional. The margin from the top. .                                                                               |
| `marginstart`                      | Optional. The margin from the start (left in LTR, right in RTL).                                                   |
| `marginEnd`                        | Optional. The margin from the end (right in LTR, left in RTL).                                                     |
| `onDelete`                         | callback when user presses delete button .                                                                         |
| `onEdit`                           | callback when user presses edit button .                                                                           |



## Support this package!

If you like this package, consider [becoming a sponsor](https://github.com/sponsors/houssemELbahri) 🩷
