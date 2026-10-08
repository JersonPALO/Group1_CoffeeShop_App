import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8F4E3",
  },

  cartcontainer: { 
    flex: 1, 
    padding: 15,
    backgroundColor: "#F8F4E3",
    paddingBottom: 50,
  },

  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15,
  },

  detailRow: { 
    flexDirection: 'row', 
    marginTop: 5 
  },

  btn: {
    backgroundColor: "#6F4E37",
    paddingVertical: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  
  cartbtn: { 
    backgroundColor: 'green', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center' 
  },


  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    },

  title: {
    fontWeight: "bold",
    fontSize: 18,
  },


  detailtitle: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },

  desc: { 
    marginVertical: 10, 
    color: '#666' 
  },

  label: { 
    fontWeight: 'bold',
    marginTop: 15 
  },

  opt: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#837b7b', 
    marginRight: 10, 
    borderRadius: 5,
    backgroundColor: '#ffffff' 
  },

  sel: { 
    backgroundColor: '#ddd' 
  },

  addBtn: { 
    backgroundColor: '#6f4e37', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 30 
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3E2723",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 15,
    color: "gray",
    textAlign: "center",
  },
  
  total: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'right', 
    marginVertical: 10 
  },

  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  removeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
