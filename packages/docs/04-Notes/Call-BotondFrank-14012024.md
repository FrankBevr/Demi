# Notes 

> People: Frank, Botond 
> Topic: Ai Data Validation
> Where: Google Meet
> When: 20:00 - 20:45

### Notes 

- Frank: Demi Introduction
- [Repo](https://github.com/FrankBevr/Demi.git), [Deita](https://github.com/hkust-nlp/deita), [UiUx](https://github.com/FrankBevr/Demi/tree/main/packages/uiux)
- Botond: 2 Ways
  - Zero Shot Learning/Validation - Simple Prompting
  - Few Shot Learning/Validation
- Example - Zero Shot Validation
   ```
   Generator
    -> Input A: "A JSON array of objects containing product information"
    -> Input B: "[{"ean": "12354", "name": "Milk 1L"}, {"ean": "146146", "name": "Butter 1KG"}]"
   ```
- Example - Few Shot Validation
   ```
   Validator
    
    -> "It must be a JSON array" (YES/NO)
    -> "It must contain realistic data" (rate between 1 and 10)
    -> "It must not contain explicit content" (YES/NO)
   ```
- Cheap - ChatGPT-4 Api
- Advancded - [Lama2 - Huggin Face Link](https://huggingface.co/meta-llama/Llama-2-70b-chat-hf), need 4 GPU's to run correctly

- Quick Update of Other Projects for next week
   ```md
   Deploy Cash 
    - [ ] Complete Milestone 1 Documentation
    - [ ] Issue Whitecard ssl cert deploy.cash, *.deploy.cahs
    - [ ] Deploy Proof Concept
    - [ ] serve helloWorld.html from deploycash cli

    Dogo
    - [ ] Teaching airplanes to fly
    - [ ] Create docs
    - [ ] deploy something

    Demi
    - [ ] Make Landing Page
    - [ ] Make Smart Contract
    - [ ] Add Button which calls contract
    - [ ] Input filed which send thingy to contract
    - [ ] Rewrite Contract
    - ... maybe ipfs thingy adding etc, work in progress..
    - [ ] (Botond) Planning Design Ai Nodes
   ```

### Summary

- There are two way to do Validation of synthetic Data Generation
- Zero Shot Validaton
- Few Shot Validation
- Botond has expierience in it via previous Work Project
- Frank sees as a Blackbox for decrease Complexity.
- Most likely in ~7 days tackling Validation part. Not necessary now.
