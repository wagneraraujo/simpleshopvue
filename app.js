const vm = new Vue({
  el: "#app",
  data:{
    produtos: [],
    produto: false
  },
  filters: {
    numeroPreco(valor){
      return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    }
  },
  methods: {
    fetchProdutos(){
      fetch("./api/produtos.json")
        .then(resposta => resposta.json())
        .then(resposta => {
          this.produtos = resposta;
        })
    },

    detalheProduto(id){
      fetch(`./api/produtos/${id}/dados.json`)
        .then(resposta => resposta.json())
        .then(resposta => {
          this.produto = resposta
        })
    },
  },
  created(){
      this.fetchProdutos()
    }
})
