# Search Engine on BigchainDB

1. Motivations
2. Architecture
3. Example scenario

# Motivations

Its a distributed search engine.
its not strictly decentralized.

# Architecture

1. DbChain on BigChainDb (ES BE no Mongo)
2. bdbnode (which you can use to post transactions to the network ) also work as validatornodes
3. searchnode (ES cluster interface)
4. ledgernode (Coin Transactions)

## FAQ

1. How to add new content to the network.

So new content to the network can be added by anyone with access to the network and can sucessfully post the transaction with a successfull voting of (n/2+1) the validatornodes.
Each validatornode optionally can adjust their price (0-1) that they think the content is worth.
the median price from the validatornodes result is set as the price for the content and the transaction is registered and the user gets the same amount of coins. 

> (voting time, etc and preferences can be changed by doing a transaction on those artifacts (if you can find them :) )

2. Does anyone run a validatornode?

It is not needed to have a running validatornode unless you want to post changes to the network. you can interact with the searchnode (wallet mode)

3. What can the owner of a content do?

* basically he can write any cryptocondition hash and put it for fulfillment. *

But, Since we want a search engine, 
a) Inserts must be incentivized (validatornodes decide coins! voting matters)
b) Deletes must be paid for (fulfillment condition for _deletes is paying 1.2*$price it was made for )
c) Updates must be also validated by validatornodes (stricter rules will apply)
d) https://github.com/bigchaindb/privacy-protocols and job's mad idea of decrypting on the fulfillment and reencrypting for only new guy to read.

4. What about searching the content.

searchnode!
So searchnode gives your ES node (or sub-cluster) access to the rest of the ES nodes via peer-VPN. 
you can have some node in your cluster with (master=1) and you can organize your ES cluster with backups etc as an ES cluster usually requires. (you cant access other peoples ES nodes directly)
** production ready is a whole new story..

5. So what does ledgernode do?

It is a helper node to just inspect and do audit trail of assets and their owners etc. It's like your wallet. bids / auctions also can be done here.

6. So validatornodes really have a lot of power

Yes. so validatornodes have to conform to certain rules, and only/all the nodes who were in the winning half of the median will get the coin distributed amongst them. 
If your validatornode cannot join the network, then you cant post content. 
coins are distributed between all nodes who voted like the median voted equally.
n/2+1 of validatornodes have to approve a node before you can join the system.

7. bdbnodes calling validatornodes

bdbnodes are responsible for adding transactions.
It validates and signs it and then posts a brodcast message with an escrow timeout on it.
until that time any validator node can pick it up and vote on it.
bdbnodes keep a list of all validatornodes that vote and it randomly initates tests on a validator node.
* If bdbnodes can FLAG a validatornode and then the network will do tests again and decide if a validatornode is healthy or note.

john - super expose usage sport logic banner finish climb border excuse enlist notice
mary - suit drum peace bleak other canvas swift maze labor jar almost festival
stub - marriage spend squirrel hobby peanut hospital olympic choose file whisper heart tornado
