import requests
import pandas as pd
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Fetches municipalities data and exports it to an Excel file'

    def handle(self, *args, **kwargs):

        url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
        response = requests.get(url)
        counties = response.json()

        data = []
        for county in counties:
            data.append({
                "Municipio": county['nome'],
                "Estado": county['microrregiao']['mesorregiao']['UF']['nome'],
                "UF": county['microrregiao']['mesorregiao']['UF']['sigla'],
                "Regiao": county['microrregiao']['mesorregiao']['UF']['regiao']['nome']
            })


        df = pd.DataFrame(data)

        df_sorted = df.sort_values(by=["UF", "Municipio"])

        output_file = "municipios_por_estado.xlsx"
        df_sorted.to_excel(output_file, index=False)

        self.stdout.write(self.style.SUCCESS(f'Dados salvos em {output_file}'))