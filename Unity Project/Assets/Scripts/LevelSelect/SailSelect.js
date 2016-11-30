#pragma strict

public var normalSailSelected: boolean;

public var blueSailLocked: boolean;
public var blueSailSelected: boolean;
public var blueSailLockedImage: GameObject;


//Shows the player what sails are locked. Make sure you add new sails here too.
function Start()
{
blueSailLockedImage.SetActive (blueSailLocked);
}





//Add in new sails here
function normalSail()
{	
	UnselectSails();
	normalSailSelected = true;
}
function blueSail()
{
	if (!blueSailSelected && !blueSailLocked)
		{
		UnselectSails();
		blueSailSelected = true;
		}
}





//Unselects all sails to stop multiple being selected
function UnselectSails()
{
	normalSailSelected = false;
	blueSailSelected = false;
}




//testing purposes, U key unlocks blue sail.
function Update()
{
if (Input.GetKeyDown(KeyCode.U))
	{
		blueSailLocked = false;
		blueSailLockedImage.SetActive (blueSailLocked);
	}
}
