#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demi {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct Demi {
        owner: AccountId,
        validator: AccountId,
        node: AccountId,
        validators: Vec<AccountId>,
        nodes: Vec<AccountId>,
        tasks: Vec<String>,
    }

    impl Demi {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: AccountId::from([0xFF as u8; 32]),
                validator: AccountId::from([0xFF as u8; 32]),
                node: AccountId::from([0xFF as u8; 32]),
                validators: Vec::new(),
                nodes: Vec::new(),
                tasks: Vec::new(),
            }
        }

        #[ink(message)]
        pub fn init(&mut self) {
            if self.owner == AccountId::from([0xFF; 32]) {
                self.owner = Self::env().caller();
            }
        }

        /*********/
        /* OWNER */
        /*********/
        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner.clone()
        }

        #[ink(message)]
        pub fn set_owner(&mut self, new_owner: AccountId) {
            if self.env().caller() == self.owner {
                self.owner = new_owner;
            }
        }

        /*************/
        /* VALIDATOR */
        /*************/
        #[ink(message)]
        pub fn get_validator(&self) -> AccountId {
            self.validator.clone()
        }

        #[ink(message)]
        pub fn set_validator(&mut self, new_validator: AccountId) {
            self.validator = new_validator;
        }

        /********/
        /* NODE */
        /********/
        #[ink(message)]
        pub fn get_node(&self) -> AccountId {
            self.node.clone()
        }

        #[ink(message)]
        pub fn set_node(&mut self, new_node: AccountId) {
            self.node = new_node
        }

        /**************/
        /* VALIDATORS */
        /**************/
        #[ink(message)]
        pub fn get_validators(&self) -> Vec<AccountId> {
            self.validators.clone()
        }

        #[ink(message)]
        pub fn add_validator(&mut self, new_validator: AccountId) {
            self.validators.push(new_validator)
        }

        /*********/
        /* NODES */
        /*********/
        #[ink(message)]
        pub fn get_nodes(&self) -> Vec<AccountId> {
            self.nodes.clone()
        }

        #[ink(message)]
        pub fn add_node(&mut self, new_node: AccountId) {
            self.nodes.push(new_node)
        }

        /*********/
        /* TASKS */
        /*********/
        #[ink(message)]
        pub fn get_tasks(&self) -> Vec<String> {
            self.tasks.clone()
        }

        #[ink(message)]
        pub fn add_task(&mut self, task: String) {
            self.tasks.push(task)
        }
    }
}
