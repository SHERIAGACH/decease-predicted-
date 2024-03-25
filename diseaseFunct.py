import sys
import json
import pickle

# -*- coding: utf-8 -*-
"""
Created on Thu Feb  8 06:20:40 2024

@author: LENOVO
"""
def my_pred(my_symptoms):
 l=df.drop('prognosis',axis=1).columns.tolist()
 disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
 'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
 ' Migraine','Cervical spondylosis',
 'Paralysis (brain hemorrhage)','Jaundice','Malaria','Chicken pox','Dengue','Typhoid','hepatitis A',
 'Hepatitis B','Hepatitis C','Hepatitis D','Hepatitis E','Alcoholic hepatitis','Tuberculosis',
 'Common Cold','Pneumonia','Dimorphic hemmorhoids(piles)',
 'Heartattack','Varicoseveins','Hypothyroidism','Hyperthyroidism','Hypoglycemia','Osteoarthristis',
 'Arthritis','(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis',
 'Impetigo']
 l2=[]
 for x in range(0,len(l)):
     l2.append(0)
 for k in range(0,len(l)):
        for z in my_symptoms:
            if(z==l[k]):
                l2[k]=1
 inputtest = [l2]
 predictions= clf.predict(inputtest)
 dict={'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
 'Peptic ulcer diseae':5,'AIDS':6,'Diaitemsbetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,'Hypertension ':10,
 'Migraine':11,'Cervical spondylosis':12,
 'Paralysis (brain hemorrhage)':13,'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
 'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,'Tuberculosis':25,
 'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,
 'Hyperthyroidism':32,'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,
 '(vertigo) Paroymsal  Positional Vertigo':36,'Acne':37,'Urinary tract infection':38,'Psoriasis':39,
 'Impetigo':40}
 Disease_pred=[key for key,value in dict.items() if value==predictions]
 return Disease_pred

