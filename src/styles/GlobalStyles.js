import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    padding: 15,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F6F1EB",
  },

  // Top Buttons
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#6F4E37",
    width: "48%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },

  greenButton: {
    backgroundColor: "green",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  // Cards
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },

  textContainer: {
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E2723",
  },

  description: {
    color: "#666",
    marginVertical: 10,
  },

  // Labels
  label: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#3E2723",
  },

  optionRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#fff",
  },

  selectedOption: {
    backgroundColor: "#ddd",
  },

  // Main Action Button
  actionButton: {
    backgroundColor: "#6F4E37",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Remove Button
  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  removeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Total
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
    color: "#3E2723",
  },

  // Empty Screens
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3E2723",
  },

  emptyText: {
    marginTop: 10,
    color: "gray",
    textAlign: "center",
    fontSize: 15,
  },
});

export default GlobalStyles;