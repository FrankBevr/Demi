#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demithree {
    use ink::env::debug_println;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(Clone, Copy, scale::Decode, scale::Encode, Debug)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub enum ValidationRating {
        GOOD,
        NORMAL,
        BAD,
    }

    #[ink(storage)]
    pub struct Demithree {
        //Actors
        owner: AccountId,
        registered_nodes: Vec<AccountId>,
        registered_validators: Vec<AccountId>,
        approved_nodes: Vec<AccountId>,
        approved_validators: Vec<AccountId>,

        //Task Managment
        tasks: Mapping<u32, String>,
        task_count: u32,
        validated_tasks: Mapping<u32, ValidationRating>,
        validated_task_count: u32,

        //Miscellaneous
        is_init: bool,
    }

    impl Demithree {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                //Actors
                owner: AccountId::from([0xFF as u8; 32]),
                registered_nodes: Vec::new(),
                registered_validators: Vec::new(),
                approved_nodes: Vec::new(),
                approved_validators: Vec::new(),
                //Task Managment
                tasks: Mapping::new(),
                task_count: 0,
                validated_tasks: Mapping::new(),
                validated_task_count: 0,
                //Miscellaneous
                is_init: false,
            }
        }
        /******/
        /*READ*/
        /******/
        /*ACTORS*/
        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }
        #[ink(message)]
        pub fn get_registered_nodes(&self) -> Vec<AccountId> {
            self.registered_nodes.clone()
        }
        #[ink(message)]
        pub fn get_registered_validators(&self) -> Vec<AccountId> {
            self.registered_validators.clone()
        }
        #[ink(message)]
        pub fn get_approved_nodes(&self) -> Vec<AccountId> {
            self.approved_nodes.clone()
        }
        #[ink(message)]
        pub fn get_approved_validators(&self) -> Vec<AccountId> {
            self.approved_validators.clone()
        }
        //Task Managment
        #[ink(message)]
        pub fn get_tasks(&self) -> Vec<(u32, String)> {
            let mut tasks: Vec<(u32, String)> = Vec::new();
            for task_index in 0..self.task_count {
                if let Some(task) = self.tasks.get(&task_index) {
                    tasks.push((task_index, task.clone()));
                }
            }
            tasks
        }
        #[ink(message)]
        pub fn get_task_count(&self) -> u32 {
            self.task_count
        }
        #[ink(message)]
        pub fn get_validated_task_count(&self) -> u32 {
            self.validated_task_count
        }
        #[ink(message)]
        pub fn get_validated_tasks(&self) -> Vec<(u32, ValidationRating)> {
            let mut validated_tasks: Vec<(u32, ValidationRating)> = Vec::new();
            for task_index in 0..self.validated_task_count {
                if let Some(rating) = self.validated_tasks.get(&task_index) {
                    validated_tasks.push((task_index, rating.clone()));
                }
            }
            validated_tasks
        }
        //Miscellaneous
        #[ink(message)]
        pub fn get_init(&mut self) -> bool {
            self.is_init
        }

        /*******/
        /*WRITE*/
        /*******/
        #[ink(message)]
        pub fn init(&mut self) {
            debug_println!("The caller:");
            debug_println!("{:?}", self.env().caller());
            if self.owner == AccountId::from([0xFF as u8; 32]) {
                self.owner = self.env().caller();
                self.is_init = true;
            }
        }
        #[ink(message)]
        pub fn change_owner(&mut self, new_owner: AccountId) {
            debug_println!("The new Owner:");
            debug_println!("{:?}", new_owner);
            if self.owner == self.env().caller() {
                self.owner = new_owner
            }
        }
        #[ink(message)]
        pub fn add_task(&mut self, new_task: String) {
            debug_println!("The task:");
            debug_println!("{:?}", new_task);
            self.tasks.insert(self.task_count, &new_task);
            self.task_count += self.task_count + 1;
        }
        #[ink(message)]
        pub fn validate_task(&mut self, index: u32, rating: ValidationRating) {
            debug_println!("The index:");
            debug_println!("{:?}", index);
            debug_println!("The rating:");
            debug_println!("{:?}", rating);
            self.validated_tasks.insert(index, &rating);
            self.validated_task_count += 1;
        }
        #[ink(message)]
        pub fn register_node(&mut self, new_node: AccountId) {
            debug_println!("The new_node:");
            debug_println!("{:?}", new_node);
            self.registered_nodes.push(new_node)
        }
        #[ink(message)]
        pub fn register_validator(&mut self, new_validator: AccountId) {
            debug_println!("The new_validator:");
            debug_println!("{:?}", new_validator);
            self.registered_validators.push(new_validator)
        }
        #[ink(message)]
        pub fn unregister_node(&mut self, node: AccountId) {
            debug_println!("The node:");
            debug_println!("{:?}", node);
            self.registered_nodes.retain(|&x| x != node);
        }
        #[ink(message)]
        pub fn unregister_validator(&mut self, validator: AccountId) {
            debug_println!("The validator:");
            debug_println!("{:?}", validator);
            self.registered_validators.retain(|&x| x != validator);
        }
        #[ink(message)]
        pub fn approve_node(&mut self, node: AccountId) {
            debug_println!("The node:");
            debug_println!("{:?}", node);
            if self.env().caller() != self.owner {
                return;
            }

            let node_clone = node.clone();
            let index = self
                .registered_nodes
                .iter()
                .position(|x| x.clone() == node_clone);
            match index {
                Some(index) => {
                    self.registered_nodes.remove(index);
                    self.approved_nodes.push(node);
                }
                None => {}
            }
        }
        #[ink(message)]
        pub fn approved_validator(&mut self, validator: AccountId) {
            debug_println!("The validator:");
            debug_println!("{:?}", validator);
            if self.env().caller() != self.owner {
                return;
            }

            let node_clone = validator.clone();
            let index = self
                .registered_validators
                .iter()
                .position(|x| x.clone() == node_clone);
            match index {
                Some(index) => {
                    self.registered_validators.remove(index);
                    self.approved_validators.push(validator);
                }
                None => {}
            }
        }
    }
}
