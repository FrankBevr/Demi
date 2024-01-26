#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demi {

    #[ink(storage)]
    pub struct Demi {
        owner: AccountId,
        validator: AccountId,
        node: AccountId,
    }

    impl Demi {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: AccountId::from([0xFF as u8; 32]),
                validator: AccountId::from([0xFF as u8; 32]),
                node: AccountId::from([0xFF as u8; 32]),
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

        /*********/
        /* NODES */
        /*********/
        #[ink(message)]
        pub fn get_node(&self) -> AccountId {
            self.node.clone()
        }

        #[ink(message)]
        pub fn set_node(&mut self, new_node: AccountId) {
            self.node = new_node
        }
    }
}
