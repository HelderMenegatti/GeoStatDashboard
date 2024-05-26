import pandas as pd
from django.core.management.base import BaseCommand
from api.models import State, County

class Command(BaseCommand):
    help = 'Load counties and state data from an Excel file'

    def handle(self, *args, **kwargs):

        excel_file = 'municipios_por_estado.xlsx'
    

        df = pd.read_excel(excel_file)

        County.objects.all().delete()
        State.objects.all().delete()


        state_dict = {}

        for _, row in df.iterrows():
            state_name = row['Estado']
            uf = row['UF']
            region = row['Regiao']
            county_name = row['Municipio']

            if state_name not in state_dict:
                state, created = State.objects.get_or_create(name=state_name)
                state.uf = uf
                state.region = region
                state.save()
                self.stdout.write(self.style.SUCCESS(f'Estado {state.name} carregado com sucesso!'))
                state_dict[state_name] = state
            else:
                estado = state_dict[state_name]

            county = County.objects.create(name=county_name, state=state)
            self.stdout.write(self.style.SUCCESS(f'Municipio {county.name} carregado com sucesso!'))

        self.stdout.write(self.style.SUCCESS('------------------\n Dados carregados com sucesso!'))