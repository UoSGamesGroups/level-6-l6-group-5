#pragma strict
public var objName: String;
public var objType: String;
public var image: Sprite;
public var nameText: Text;
public var typeText: Text;
public var imageObj: Image;

function Update () 
{
	nameText.text = objName;
	typeText.text = objType;
	imageObj.sprite = image;
}
