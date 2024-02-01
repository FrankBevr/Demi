#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demithree {
    use ink::prelude::string::String;
    use ink::prelude::string::ToString;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(Clone, Copy, scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub enum ValdiationRating {
        GOOD,
        NORMAL,
        BAD,
    }

    #[ink(storage)]
    pub struct Demithree {
        owner: AccountId,
        nodes: Vec<AccountId>,
        validators: Vec<AccountId>,
        tasks: Mapping<u32, String>,
        task_count: u32,
        validated_tasks: Mapping<u32, ValdiationRating>,
        validated_tasks_count: u32,
        is_init: bool,
    }

    impl Demithree {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: AccountId::from([0xFF as u8; 32]),
                nodes: Vec::new(),
                validators: Vec::new(),
                tasks: Mapping::new(),
                task_count: 0,
                validated_tasks: Mapping::new(),
                validated_tasks_count: 0,
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

        #[ink(message)]
        pub fn add_task(&mut self, new_task: String) {
            self.tasks.insert(self.task_count, &new_task);
            self.task_count += self.task_count + 1;
        }

        #[ink(message)]
        pub fn get_task(&self, index: u32) -> String {
            self.tasks.get(index).unwrap()
        }

        #[ink(message)]
        pub fn get_tasks(&mut self, index: u32) -> String {
            if self.task_count < index {
                self.tasks.get(index).unwrap()
            } else {
                "Not found".to_string()
            }
        }

        #[ink(message)]
        pub fn validate_task(&mut self, index: u32, rating: ValdiationRating) {
            self.validated_tasks.insert(index, &rating);
            self.validated_tasks_count += 1;
        }

        #[ink(message)]
        pub fn get_validated_rating(&mut self, index: u32) -> ValdiationRating {
            self.validated_tasks.get(&index).unwrap()
        }
    }
}
