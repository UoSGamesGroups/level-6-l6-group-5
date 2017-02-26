#pragma strict
public var rotateAmountX: float;
public var rotateAmountY: float;
public var rotateAmountZ: float;

function Start () 
{
	transform.Rotate(rotateAmountX,0,0);
	transform.Rotate(0,rotateAmountY,0);
	transform.Rotate(0,0,rotateAmountZ);
}
