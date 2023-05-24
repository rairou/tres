// (c) 2018 Kristian Klein Jacobsen.  
// Modified version of https://github.com/kristianklein/PushButton (under MIT License)

#include "btn.h"
#include <Arduino.h>

#define IDLE 0
#define ACTIVE 1
#define CLICKED 2
#define DOUBLE_CLICKED 3
#define RELEASED 4
#define FIRST_HELD 5
#define HELD 6

button::button(int pin)
{
	pin_ = pin;
	state_ = IDLE;
	debounced_ = true;
	doubleClickable_ = true;
	activeLogic_ = true;
	debounceTime_ = 10;
	holdTime_ = 2000;
	doubleClickTime_ = 300;
	lastClickTime_ = 0;
	lastReleaseTime_ = 0;
	pressed_ = 0;
}

void button::update()
{
	if (pressed_ > 10) {
		pressed_ = 0;
	}
	switch (state_)
	{
		
		case IDLE:
			if (debounced_)
			{
				if (isActive()) // button clicked
				{	
					if (millis() - lastClickTime_ < doubleClickTime_)
					{
						// pressed_++;
						state_ = DOUBLE_CLICKED;
					}
					else
					{
						state_ = CLICKED;
					}

					pressed_++;
					debounced_ = false;
					lastClickTime_ = millis();
				}
			}
			else if (millis() - lastReleaseTime_ > debounceTime_)
			{
				debounced_ = true;
			}
			break;
			
		case ACTIVE:
			if (debounced_) // Only check button again when it has been debounced
			{
				if (!isActive()) // button not active, hence released
				{
					state_ = RELEASED;
				}
				else if (millis() - lastClickTime_ > holdTime_) // button held
				{
					state_ = FIRST_HELD;
				}
			}
			else if (millis() - lastClickTime_ > debounceTime_) // Check if debounce time has passed
			{
				debounced_ = true;
			}
			break;
			
		case CLICKED:
		case DOUBLE_CLICKED:
			state_ = ACTIVE;
			break;
			
		case RELEASED:
			state_ = IDLE;
			debounced_ = false;
			lastReleaseTime_ = millis();
			break;
			
		case FIRST_HELD:
			state_ = HELD;
			break;
		
		case HELD:
			if (!isActive())
			{
				state_ = RELEASED;
			}
			break;
			
		default: // This should never execute
			state_ = IDLE;
			break;
	}
}

bool button::isPressed(int n) {
	if (pressed_ == n) {
		pressed_ = 0;
		return true;
	} else {
		return false;
	}
}

bool button::isActive()
{
	return (digitalRead(pin_) == activeLogic_);
}

bool button::isClicked()
{
	return (state_ == CLICKED);
	
}

bool button::isDoubleClicked()
{
	if (doubleClickable_)
	{
		return (state_ == DOUBLE_CLICKED);
	}
	else
	{
		return false;
	}
}

bool button::isHeld()
{
	return (state_ == FIRST_HELD);
}

bool button::isReleased()
{
	return (state_ == RELEASED);
}

void button::disableDoubleClick()
{
	doubleClickable_ = false;
}

void button::enableDoubleClick()
{
	doubleClickable_ = true;
}

void button::setDebounceTime(int ms)
{
	debounceTime_ = ms;
}

void button::setHoldTime(int ms)
{
	holdTime_ = ms;
}

void button::setDoubleClickTime(int ms)
{
	doubleClickTime_ = ms;
}

void button::setActiveLogic(int high_or_low)
{
	activeLogic_ = high_or_low;
}