import React from 'react'
import axios from 'axios'
import "../../tailwind.output.css";
import { ContainerForm, FormLine, FormInfo, ContCheck } from "./slyted"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class FormCadastro extends React.Component {
  state = {
    inputTema: "",
    inputValor: "",
    inputInfo: "",
    inputData: "",
    checkDin: "",
    checkCar: "",
    checkBol: "",
    checkPix: "",
    checkedD: false,
    checkedC: false,
    checkedB: false,
    checkedP: false,
  }

  handleTema = (e) => {
    this.setState({ inputTema: e.target.value })
  }
  handleValor = (e) => {
    if (Number(e.target.value) <= 0) {
      alert("Entre com um valor válido")
    } else {
      this.setState({ inputValor: Number(e.target.value) })
    }
  }
  handleInfo = (e) => {
    this.setState({ inputInfo: e.target.value })
  }

  handleData = (e) => {
    this.setState({ inputData: e.target.value })
  }

  handleCheckDin = (e) => {
    if (e.target.checked) {
      this.setState({
        checkDin: "dinheiro",
        checkedD: !this.state.checkedD,
      })
    } else {
      this.setState({
        checkDin: "",
        checkedD: !this.state.checkedD,
      })
    }
  }

  handleCheckCar = (e) => {
    if (e.target.checked) {
      this.setState({
        checkCar: "cartão",
        checkedC: !this.state.checkedC
      })
    } else {
      this.setState({
        checkCar: "",
        checkedC: !this.state.checkedC
      })
    }
  }

  handleCheckBol = (e) => {
    if (e.target.checked) {
      this.setState({
        checkBol: "boleto",
        checkedB: !this.state.checkedB
      })
    } else {
      this.setState({
        checkBol: "",
        checkedB: !this.state.checkedB
      })
    }
  }

  handleCheckPix = (e) => {
    if (e.target.checked) {
      this.setState({
        checkPix: "pix",
        checkedP: !this.state.checkedP
      })
    } else {
      this.setState({
        checkPix: "",
        checkedP: !this.state.checkedP
      })
    }
  }

  cadastraAula = () => {
    const Pgt = [this.state.checkDin, this.state.checkCar, this.state.checkBol, this.state.checkPix]
    const URL = "https://labeninjas.herokuapp.com/jobs"
    const headers = { headers: { Authorization: "6b5d3ade-aeb6-4364-91fa-b9a319e476c5" } }
    const body = {
      "title": this.state.inputTema,
      "description": this.state.inputInfo,
      "price": (this.state.inputValor),
      "paymentMethods": Pgt,
      "dueDate": this.state.inputData,
    }

    if (this.state.inputTema === "" || this.state.inputValor === "" || this.state.inputInfo === "" || this.state.inputData === "" || (this.state.checkDin === "" && this.state.checkCar === "" && this.state.checkBol === "" && this.state.checkPix === "")) {
      toast.error('Por favor preencha todos os campos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios.post(`${URL}`, body, headers)
        .then((res) => {
          toast.success('Cadastrado com Sucesso!', {
            posição: "superior direito",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            arrastável: true,
            progresso: undefined,
          });
          this.setState({
            inputTema: "",
            inputValor: "",
            inputInfo: "",
            inputData: "",
            checkedD: false,
            checkedC: false,
            checkedB: false,
            checkedP: false,
          })
        })
        .catch((err) => {
          toast.error('ocorreu um erro, tente novamente', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
    }
  }

  render() {
    return (
      <ContainerForm >
        <div className="flex flex-col m-auto justify-between">

          <h2 className="text-lg font-bold text-center mb-4">Cadastro</h2>

          <FormLine >
            <h3 className="font-bold">Nome - Tema da aula:</h3>
            <input
              type="text"
              placeholder="Nome/tema da aula"
              className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
              onChange={this.handleTema}
              value={this.state.inputTema}
            />
          </FormLine>

          <FormLine >
            <h3 className="font-bold">Valor da aula:</h3>
            <input
              type="number"
              placeholder="Valor"
              className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
              onChange={this.handleValor}
              value={this.state.inputValor}
            />
          </FormLine>

          <FormLine >
            <h3 className="font-bold">Prazo para uso:</h3>
            <input
              type="date"
              className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
              onChange={this.handleData}
              value={this.state.inputData}
            />
          </FormLine>

          <FormLine >

            <h3 className="mr-1 font-bold">Formas de pagamento: </h3>

            <ContCheck>

              <label >Dinheiro
                  <input
                  type="checkbox"
                  onChange={this.handleCheckDin}
                  className="form-checkbox h-3 w-3 text-blue-600"
                  checked={this.state.checkedD}
                />
              </label>

              <label >Cartão
                  <input
                  type="checkbox"
                  onChange={this.handleCheckCar}
                  className="form-checkbox h-3 w-3 text-blue-600"
                  checked={this.state.checkedC}
                />
              </label>

              <label >Boleto
                  <input
                  type="checkbox"
                  onChange={this.handleCheckBol}
                  className="form-checkbox h-3 w-3 text-blue-600"
                  checked={this.state.checkedB}
                />
              </label>

              <label >Pix
                  <input
                  type="checkbox"
                  onChange={this.handleCheckPix}
                  className="form-checkbox h-3 w-3 text-blue-600"
                  checked={this.state.checkedP}
                />
              </label>

            </ContCheck>
          </FormLine>
        </div>

          <FormInfo >
          <h3>Descrição:</h3>

          <textarea
            type="text"
            placeholder="Máximo de 300 caracteres"
            rows="3"
            cols="50"
            maxlength="300"
            className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
            onChange={this.handleInfo}
            value={this.state.inputInfo}
          />
        </FormInfo>

        <button
          onClick={this.cadastraAula}
          className="bg-blue-500 px-5 py-2 text-lg font-semibold tracking-wider text-white rounded-full hover:bg-blue-600"
        >Cadastrar
      </button>
        <ToastContainer />
      </ContainerForm>

    )
  }
}