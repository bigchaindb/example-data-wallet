MarketPlace 
------------------
https://interledger.org/overview.html
(for access to payments API)

1. Buyer

> posts item for sale and pics!

2. Sellers

> Posts prices 

== buyer can choose a seller and 
    encrypt a msg for him with pickup and contact details in the finalized transaction ==

3. Validation during Exchange point

> QR code scanner App
> The validation transaction will have the price that was agreed upon.

https://github.com/bigchaindb/bigchaindb/issues/626

till now we don't allow for verifiability for text assets. 
The network cannot approve or reject transactions based on their text content. 
Protocols built using text assets must rely on an domain overlay network (don) to add a new layer of validation.

Steps to Estabilish 
1. Create a 'transaction' with your public key 
2. when visiting the asset_page of another person, you may initiate the handshake which 'creates' a handshake transaction. using this transaction and the pvt key you just created.. you may always be able to communicate with this person now. (pyDHE)
3. person will get a 'notification' in their stream that a transaction was created with him as owner, he can use his pvt key to decrypt the record on the chain.
4. alice checks her unspents to see the msgs for her. she can simply 'spend' the transaction to clear it.
5. alice can anomyize another msg and transfer it to bob to reply. 

> you anonymize a msg for bob then transfer it to him,