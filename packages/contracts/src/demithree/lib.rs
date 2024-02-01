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
    }
}
