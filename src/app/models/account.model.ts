export interface AccountDetails{
    accountId : string ;
    balance : number;
    currentPage : number; 
    totalPages : number;
    pageSize : number;
    accountOperationDTOS : AccountOperation[];
}


export interface AccountOperation{
    id: number;
    operationDate : Date;
    amount : number;
    type : string ;
    description : string;
}

/*

  "accountId": "b9e65111-31eb-4a8f-82ca-91a47e779638",
  "balance": 124766.13442421425,
  "currentPage": 0,
  "totalPages": 4,
  "pageSize": 5,
  "accountOperationDTOS": [
    {
      "id": 101,
      "operationDate": "2024-02-14T10:35:20.531+00:00",
      "amount": 12000,
      "type": "CREDIT",
      "description": "Credit"
    }*/