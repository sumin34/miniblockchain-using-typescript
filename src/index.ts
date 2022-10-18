
import crypto from "crypto";

interface BlockShape{
    hash:string;
    prevHash:string;
    height: number;
    data:string;
}

class Block implements BlockShape{
    public hash: string;
    constructor(
    //hash:string,
    public prevHash:string,
    public height: number,
    public data:string
    ){
        this.hash = Block.calculateHash(prevHash,height,data);
    }
    static calculateHash(prevHash:string,height:number,data:string){
        const toHash=`${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain{
    private blocks:Block[]
    constructor(){
        this.blocks = [];
    }
    private getPreHash(){
        if(this.blocks.length===0) return "";
        return this.blocks[this.blocks.length-1].hash;
    }
    public addBlock(data:string){
        const newblock = new Block(this.getPreHash(), this.blocks.length +1,data);
        this.blocks.push(newblock);
    }

    public getBlocks(){
        return [...this.blocks];
    }
}


const blockchain = new BlockChain();

blockchain.addBlock("first");
blockchain.addBlock("second");
blockchain.addBlock("third");
blockchain.addBlock("fourth");



console.log(blockchain.getBlocks());