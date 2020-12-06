pragma solidity ^0.5.0;

contract Wikipedia {
  uint public  nbArt = 0 ;
  struct Article {
    uint id;
    string content;
  }

  uint[] public ids;
  mapping (uint => Article) public articlesById;

  constructor() public {
   /* uint index = 0;
    ids.push(index);
    Article memory newArticle = Article(index,"This is your first article in your contract");
    articlesById[index] = newArticle;
    */ addArticle("first Article") ;
  }

  function articleContent(uint index) public view returns (string memory) {
    return articlesById[index].content;
  }

  function getAllIds() public view returns (uint[] memory) {
    return ids;
  }

  function addArticle(string memory cont ) public {
      nbArt ++ ;
      articlesById[nbArt] = Article(nbArt,cont);
  }
  function editArticle(string memory cont , uint id ) public {
      
      articlesById[id] = Article(id,cont);
  }
  
}
 