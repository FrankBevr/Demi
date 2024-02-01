#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demithree {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct Demithree {
        owner: AccountId,
        nodes: Vec<AccountId>,
        validators: Vec<AccountId>,
        tasks: Vec<String>,
        is_init: bool,
    }

    impl Demithree {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: AccountId::from([0xFF as u8; 32]),
                nodes: Vec::new(),
                validators: Vec::new(),
                tasks: Vec::new(),
                is_init: false,
            }
        }
        #[ink(message)]
        pub fn empty_message(&self) {}

        #[ink(message)]
        pub fn init(&mut self) {
            if self.owner == AccountId::from([0xFF as u8; 32]) {
                self.owner = self.env().caller();
                self.is_init = true;
            }
        }

        #[ink(message)]
        pub fn get_init(&mut self) -> bool {
            self.is_init
        }

        #[ink(message)]
        pub fn change_owner(&mut self, new_owner: AccountId) {
            if self.owner == self.env().caller() {
                self.owner = new_owner
            }
        }

        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }

        #[ink(message)]
        pub fn add_node(&mut self, new_node: AccountId) {
            self.nodes.push(new_node)
        }

        #[ink(message)]
        pub fn get_nodes(&self) -> Vec<AccountId> {
            self.nodes.clone()
        }

        #[ink(message)]
        pub fn add_validator(&mut self, new_validator: AccountId) {
            self.validators.push(new_validator)
        }

        #[ink(message)]
        pub fn get_validators(&self) -> Vec<AccountId> {
            self.validators.clone()
        }
    }
}
