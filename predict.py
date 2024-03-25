import sys
import json
import pickle
# import diseaseFunct
import diseasepred
# import joblib
# with open('disease_pred.pkl', 'rb') as f:
#     model = pickle.load(f)
    
# Chargez le modèle scikit-learn
# model = joblib.load('disease_pred.pkl')

# Récupérez les données d'entrée depuis les arguments de la ligne de commande
input_data =(sys.argv[1])
# input_data = ["belly_pain","diarrhoea","depression","internal_itching","sweating"]

def creer_array_depuis_virgules(chaine):
  """
  Fonction pour créer un array à partir d'une chaîne séparée par des virgules.

  Args:
      chaine: La chaîne à convertir en array.

  Returns:
      Une liste contenant des arrays.
  """
  elements = chaine.split(",")
  liste_array = []
  for element in elements:
    # Supprime les espaces avant et après chaque élément
    element = element.strip()
    # Si l'élément est vide, on ignore
    if not element:
      continue
    # Crée un array à partir de l'élément
    array = element.split(" ")
    liste_array.append(array)

  return liste_array

# Exemple d'utilisation
chaine =(input_data)
liste_array = creer_array_depuis_virgules(chaine)


# Faites des prédictions avec le modèle
predictions =diseasepred.my_pred(liste_array)
print(f"the prediction gives: ",predictions)

# Imprimez les prédictions au format JSON pour que Node.js puisse les lire
# print(json.dumps(predictions.tolist()))
