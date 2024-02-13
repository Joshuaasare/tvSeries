import React, {useState} from 'react';
import {Button, Modal, Text, View} from 'react-native';

export default function FoodDetailsModal({
  foodName,
  description,
  visible,
  onClose,
  onAccept,
  onShow,
}) {
  // YOUR SOLUTION HERE
  const [quantity, setQuantity] = useState(0);

  const addItem = () => {
    setQuantity(prev => prev + 1);
  };
  const subtractItem = () => {
    setQuantity(prev => prev - 1);
  };

  return (
    <View>
      <Modal
        style={{flex: 1}}
        onDismiss={onClose}
        visible={visible}
        onShow={onShow}>
        <Text>{foodName}</Text>
        <Text>{description}</Text>
        <Text testID="quantity-id">{quantity}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            t
            testID="plus-button-id"
            disabled={quantity === 10}
            onPress={addItem}>
            Add
          </Button>
          <Button
            testID="minus-button-id"
            disabled={quantity === 0}
            onPress={subtractItem}>
            Subtract
          </Button>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button testID="accept-button-id" onPress={onClose}>
            Accept
          </Button>
          <Button testID="close-button-id" onPress={() => onAccept(quantity)}>
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
}

// If you wish to go with Class Component instead of Function Component

// class FoodDetailsModal extends React.Component {
//
//   render() {
//       return (
//           <View>
//           </View>
//       );
//   }
// }
//
// export default FoodDetailsModal;
