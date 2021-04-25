const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinho: []
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach(item => {
          total += item.preco;
        });
      }
      return total;
    }
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then(resposta => resposta.json())
        .then(resposta => {
          this.produtos = resposta;
        });
    },

    detalheProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(resposta => resposta.json())
        .then(resposta => {
          this.produto = resposta;
        });
    },

    adicionarItem() {
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
    },

    removerItem(index) {
      this.carrinho.splice(index, 1);
    }
  },
  created() {
    this.fetchProdutos();
  }
});
