// (c) 2018 Kristian Klein Jacobsen. 
// Modified version of https://github.com/kristianklein/PushButton (under MIT license)

#ifndef _BTN_H
#define _BTN_H

class button
{
	public:
		button(int pin);
		void update();
		bool isActive();
		bool isClicked();
		bool isDoubleClicked();
		bool isHeld();
		bool isPressed(int n);
		bool isReleased();
		void disableDoubleClick();
		void enableDoubleClick();
		void setDebounceTime(int ms);
		void setHoldTime(int ms);
		void setDoubleClickTime(int ms);
		void setActiveLogic(int high_or_low);
		int pressed_;

	private:
		int state_;
		long lastClickTime_;
		long lastReleaseTime_;
		int pin_;
		bool doubleClickable_;
		bool activeLogic_;
		bool debounced_;
		int debounceTime_;
		int holdTime_;
		int doubleClickTime_;
		// int pressed_;
};

#endif