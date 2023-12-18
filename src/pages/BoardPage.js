import { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import CreateBoardModal from "./CreateBoardModal";

const BoardPage = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    retrieveAllBoard().then(console.log("SUCCESS_RETRIEVE"));
  }, []);

  const retrieveAllBoard = async () => {
    fetch("http://192.168.123.109:8080/board/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setBoards(res.data.data);
      });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>게시판</Text>
      </View>
      <View style={styles.boarder}>
        {boards &&
          boards.map((board) => (
            <View>
              <Text style={styles.title}>{board.title}</Text>
              <Text style={styles.title}>{board.content}</Text>
              <Text style={styles.title}>{board.date}</Text>
            </View>
          ))}
        <CreateBoardModal modalVisible={modalVisible} closeModal={closeModal} />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>게시글 생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7DC",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 100,
    backgroundColor: "#F2D98D",
    width: "100%",
    top: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 30,
  },
  boarder: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  bottomBar: {
    backgroundColor: "#F2D98D",
    width: "100%",
    height: 150,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    margin: 10,
  },
});

export default BoardPage;
