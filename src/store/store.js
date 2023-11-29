import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
axios.defaults.baseURL = "https://finance-todo.onrender.com";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

export default createStore({
  state: {
    phone: "",
    password: "",
    apiEndpoint: "https://finance-todo.onrender.com",
    accessToken: "",
    UserData: "",
    UserBalance: [],
    selectedCurrency: "",
    Category: [],
    CategorySub: [],
    transactions: [],
  },
  mutations: {
    resetState(state) {
      state.phone = "";
      state.password = "";
      state.accessToken = "";
      state.UserData = "";
      state.UserBalance = [];
      state.selectedCurrency = "";
    },
    setPhoneNumber(state, phoneNumber) {
      state.phone = phoneNumber;
    },
    setSelectedCurrency(state, selectedCurrency) {
      state.selectedCurrency = selectedCurrency;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setFetchUser(state, user) {
      state.UserData = user;
    },
    setFetchCategory(state, Category) {
      state.Category = Category;
    },
    setFetchCategorySub(state, CategorySub) {
      state.CategorySub = CategorySub;
    },
    setFetchtransactions(state, transactions) {
      state.transactions = transactions;
    },
    setFetchUserBalance(state, user) {
      state.UserBalance = user.data;
    },
    addRecord(state, record) {
      if (!Array.isArray(state.UserBalance)) {
        state.UserBalance = [];
      }
      state.UserBalance.push(record);
    },
  },
  actions: {
    resetStore({ commit }) {
      commit("resetState", null);
    },
    addRecord({ commit, state }, record) {
      return axios
        .post(
          `${state.apiEndpoint}/balances`,
          {
            title: record.title,
            type: record.type,
            value: record.value,
            currency: record.currency,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        )
        .then((response) => {
          commit("addRecord", record);
          return response;
        })
        .catch((error) => {
          record.send = 0;
          commit("addRecord", record);
          throw error;
        });
    },

    addSelectedCurrency({ commit }, SelectedCurrency) {
      commit("setSelectedCurrency", SelectedCurrency);
    },
    register({ state }) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${state.apiEndpoint}/users`,
            {
              username: state.phone,
              phone: state.phone,
              password: state.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.error("Registration failed:", error.response || error);
            reject(error);
          });
      });
    },
    login({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${state.apiEndpoint}/users/login`,
            {
              phone: state.phone,
              username: state.phone,
              password: state.password,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response) => {
            const { access_token } = response.data;
            localStorage.setItem("access_token", access_token);
            commit("setAccessToken", access_token);
            resolve(response.data);
          })
          .catch((error) => {
            console.error("Login failed:", error.response || error);
            reject(error);
          });
      });
    },
    fetchUser({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.accessToken}`;
        axios
          .get(
            `${state.apiEndpoint}/users/me`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            commit("setFetchUser", response);
            resolve(response.data);
          })
          .catch((error) => {
            console.error("Login failed:", error.response || error);
            reject(error);
          });
      });
    },
    fetchCategory({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.accessToken}`;
        axios
          .get(
            `${state.apiEndpoint}/categories`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            commit("setFetchCategory", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.error("Category fetch failed:", error.response || error);
            reject(error);
          });
      });
    },
    fetchCategorySub({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.accessToken}`;
        axios
          .get(
            `${state.apiEndpoint}/categories/sub`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            commit("setFetchCategorySub", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.error(
              "Category Sub fetch failed:",
              error.response || error
            );
            reject(error);
          });
      });
    },
    fetchTransactions({ commit, state }) {
      const userBalances = state.UserBalance;

      const fetchPromises = [];

      for (const balance of userBalances) {
        const fetchPromise = new Promise((resolve, reject) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${state.accessToken}`;
          axios
            .get(
              `${state.apiEndpoint}/transactions`,
              {
                params: {
                  balance_id: balance.id,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              if (response.data && response.data.length > 0) {
                const newTransactions = response.data;

                newTransactions.forEach((newTransaction) => {
                  const existingTransaction = state.transactions.find(
                    (transaction) => transaction.id === newTransaction.id
                  );
                  if (!existingTransaction) {
                    console.log("Добавлена новая транзакция");
                    state.transactions.push(newTransaction);
                  }
                });
                console.log("существует та же транзакция");
                resolve(response.data);
              } else {
                console.log("Массив пустой");
              }
            })
            .catch((error) => {
              console.error(
                "setFetchtransactions fetch failed:",
                error.response || error
              );
              reject(error);
            });
        });

        fetchPromises.push(fetchPromise);
      }
      return Promise.all(fetchPromises);
    },
    fetchCategorySubCreate({ commit, state, dispatch }, title) {
      return axios
        .post(
          `${state.apiEndpoint}/categories/sub`,
          {
            title: title,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch("fetchCategorySub");
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    fetchCategoryTransactionCreate({ commit, state, dispatch }, transactions) {
      return axios
        .post(
          `${state.apiEndpoint}/transactions`,
          {
            title: transactions.title,
            value: transactions.value,
            balance_id: transactions.balance_id,
            sub_category_id: transactions.sub_category_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    fetchUserBalance({ commit, state, actions }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.accessToken}`;
        axios
          .get(
            `${state.apiEndpoint}/balances`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const localstate = state.UserBalance;
            const recordsToSend = localstate.filter(
              (record) => record.send === 0
            );
            console.log(recordsToSend);

            // Use Promise.all to wait for all promises to resolve
            const sendRecordPromises = recordsToSend.map((record) => {
              return axios.post(
                `${state.apiEndpoint}/balances`,
                {
                  title: record.title,
                  type: record.type,
                  value: record.value,
                  currency: record.currency,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.accessToken}`,
                  },
                }
              );
            });

            Promise.all(sendRecordPromises)
              .then(() => {
                axios
                  .get(
                    `${state.apiEndpoint}/balances`,
                    {},
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${state.accessToken}`,
                      },
                    }
                  )
                  .then((updatedResponse) => {
                    const newServestate = updatedResponse;
                    console.log("All records sent");
                    commit("setFetchUserBalance", newServestate);
                    resolve(updatedResponse.data);
                  })
                  .catch((error) => {
                    console.error("Error updating servestate:", error);
                    reject(error);
                  });
              })
              .catch((error) => {
                console.error("Error during record sending:", error);
                reject(error);
              });
          })
          .catch((error) => {
            console.error("Login failed:", error.response || error);
            reject(error);
          });
      });
    },
  },
  getters: {
    getUserData: (state) => {
      return state.UserData;
    },
    getCategory: (state) => {
      return state.Category;
    },
    getCategorySub: (state) => {
      return state.CategorySub;
    },
    getSelectedCurrency: (state) => {
      return state.selectedCurrency;
    },
    getUserBalance: (state) => {
      return state.UserBalance;
    },
    getUserTransactions: (state) => {
      return state.transactions;
    },
  },
  plugins: [createPersistedState()],
});
