const Node = require('./models/TreeNode').TreeNode;
const Error = require('./utils/Utils').TreeErrorHandling;

let root = null;

// helper method which creates a new node to
// be inserted and calls insertNode
function InsertValueInTree(value, tree) {
  // Creating a node and initailising
  // with value
  var newNode = Node(value);
  //if tree is null then we crate a new tree
  if (tree === null) {
    root = newNode;
  }
  else 
  {
    //if tree is not null, then we need to check if the tree value is already in the binary tree
    if(!searchNode(root, tree))
    {
      return Error(`Tree with root ${tree} does not exist!`);
    }
    // find the correct position in the
    // tree and add the node
    if(root === null)
    {
      return Error(`Root node ${tree} does not exist!`);
    }
    insertNode(root, newNode);
  }
  return root;
}

// Method to insert a node in a tree
// it moves over the tree to find the location
// to insert a node with a given value
function insertNode(root, newNode) {
  // check if incoming root is addressing expected newNode
  //if()
  // if the value is less than the node
  // value move left of the tree
  if (newNode.value < root.value) {
    // if left is null insert node here
    if (root.left === null) {
      root.left = newNode;
    }
    else {
      // if left is not null recur until
      // null is found
      insertNode(root.left, newNode);
    }
  }
  // if the value is more than the node
  // value move right of the tree
  else {
    // if right is null insert node here
    if (root.right === null) {
      root.right = newNode;
    }
    else {
      // if right is not null recur until
      // null is found
      insertNode(root.right, newNode);
    }
  }
  return newNode;
}

function searchNode(node, value)
{
    // if trees is empty return null
    if(node === null)
    {
      return null;
    }

    // if data is less than node's data
    // move left
    if(value < node.value)
    {
      return searchNode(node.left, value);
    }

    // if data is less than node's data
    // move left
    if(value > node.value)
    {
      return searchNode(node.right, value);
    }
    
    if(value === node.value)
    {
      return node;
    }
}

module.exports = {
  InsertValueInTree: InsertValueInTree
}