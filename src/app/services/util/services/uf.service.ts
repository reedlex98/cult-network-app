import {Injectable} from "@angular/core";
import {Uf} from "../../dto/uf";

@Injectable()
export class UfService {

  private listUF = [
    {'name': 'AC', 'value': 'AC'},
    {'name': 'AL', 'value': 'AL'},
    {'name': 'AM', 'value': 'AM'},
    {'name': 'AP', 'value': 'AP'},
    {'name': 'BA', 'value': 'BA'},
    {'name': 'CE', 'value': 'CE'},
    {'name': 'DF', 'value': 'DF'},
    {'name': 'ES', 'value': 'ES'},
    {'name': 'GO', 'value': 'GO'},
    {'name': 'MA', 'value': 'MA'},
    {'name': 'MG', 'value': 'MG'},
    {'name': 'MS', 'value': 'MS'},
    {'name': 'MT', 'value': 'MT'},
    {'name': 'PA', 'value': 'PA'},
    {'name': 'PB', 'value': 'PB'},
    {'name': 'PE', 'value': 'PE'},
    {'name': 'PI', 'value': 'PI'},
    {'name': 'PR', 'value': 'PR'},
    {'name': 'RJ', 'value': 'RJ'},
    {'name': 'RN', 'value': 'RN'},
    {'name': 'RR', 'value': 'RR'},
    {'name': 'RS', 'value': 'RS'},
    {'name': 'SC', 'value': 'SC'},
    {'name': 'SE', 'value': 'SE'},
    {'name': 'SP', 'value': 'SP'},
    {'name': 'TO', 'value': 'TO'},
    {'name': 'RO', 'value': 'RO'}
  ];

  private listState = [
    {name: 'Acre', value: 'AC'},
    {name: 'Alagoas', value: 'AL'},
    {name: 'Amap\u00e1', value: 'AP'},
    {name: 'Amazonas', value: 'AM'},
    {name: 'Bahia', value: 'BA'},
    {name: 'Cear\u00e1', value: 'CE'},
    {name: 'Distrito Federal', value: 'DF'},
    {name: 'Esp\u00edrito Santo', value: 'ES'},
    {name: 'Goi\u00e1s', value: 'GO'},
    {name: 'Maranh\u00e3o', value: 'MA'},
    {name: 'Mato Grosso', value: 'MT'},
    {name: 'Mato Grosso do Sul', value: 'MS'},
    {name: 'Minas Gerais', value: 'MG'},
    {name: 'Paran\u00e1', value: 'PR'},
    {name: 'Para\u00edba', value: 'PB'},
    {name: 'Par\u00e1', value: 'PA'},
    {name: 'Pernambuco', value: 'PE'},
    {name: 'Piau\u00ed', value: 'PI'},
    {name: 'Rio Grande do Norte', value: 'RN'},
    {name: 'Rio Grande do Sul', value: 'RS'},
    {name: 'Rio de Janeiro', value: 'RJ'},
    {name: 'Rond\u00f4nia', value: 'RO'},
    {name: 'Roraima', value: 'RR'},
    {name: 'Santa Catarina', value: 'SC'},
    {name: 'Sergipe', value: 'SE'},
    {name: 'S\u00e3o Paulo', value: 'SP'},
    {name: 'Tocantins', value: 'TO'}
  ];

  getListUf(): Uf[] {
    return this.listUF;
  }

  getListState(): Uf[] {
    return this.listState;
  }

}
