import requests
import pandas as pd
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Fetches municipalities data and exports it to an Excel file'

    def handle(self, *args, **kwargs):

        url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
        response = requests.get(url)
        municipios = response.json()

        data = []
        for municipio in municipios:
            data.append({
                "Municipio": municipio['nome'],
                "Estado": municipio['microrregiao']['mesorregiao']['UF']['nome'],
                "UF": municipio['microrregiao']['mesorregiao']['UF']['sigla'],
                "Regiao": municipio['microrregiao']['mesorregiao']['UF']['regiao']['nome']
            })


        df = pd.DataFrame(data)

        df_sorted = df.sort_values(by=["UF", "Municipio"])

        output_file = "municipios_por_estado.xlsx"
        df_sorted.to_excel(output_file, index=False)

        self.stdout.write(self.style.SUCCESS(f'Dados salvos em {output_file}'))