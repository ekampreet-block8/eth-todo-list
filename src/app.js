App = {
  Loading: false,
  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please connect to Metamask.");
    }
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        web3.eth.sendTransaction({
          /*...*/
        });
      } catch (error) {}
    } else if (window.web3) {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      web3.eth.sendTransaction(/* .... */);
    } else {
      console.log(
        "Non-Ethereum browser detected.You should consider trying MetaMask!"
      );
    }
  },

  loadAccount: async () => {
    App.account = web3.eth.accounts[0];
  },

  loadContract: async () => {
    const todoList = await $.getJSON("TodoList.json");
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    App.todoList = await App.contracts.TodoList.deployed();
  },

  render: async () => {
    //prevent double render
    if (App.Loading) {
      return;
    }
    //update app loading state
    App.setLoading(true);
    //Render Account
    $("#account").html(App.account);
    //Update loading state
    App.setLoading(false);
  },
  setLoading: boolean => {
    App.loading = boolean;
    const loader = $("#loader");
    const content = $("#content");
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  }
};
$(() => {
  $(window).load(() => {
    App.load();
  });
});
