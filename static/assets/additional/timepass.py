import time
import threading
import keyboard
import tkinter as tk

class HandwritingApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Handwriting Simulator")
        
        self.label = tk.Label(root, text="Enter your text:")
        self.label.pack(pady=10)
        
        self.text_entry = tk.Entry(root, width=50)
        self.text_entry.pack(pady=10)
        
        self.label_delay = tk.Label(root, text="Enter the delay between characters (seconds):")
        self.label_delay.pack(pady=10)
        
        self.delay_entry = tk.Entry(root, width=50)
        self.delay_entry.pack(pady=10)
        
        self.start_button = tk.Button(root, text="Start Writing", command=self.start_handwriting)
        self.start_button.pack(pady=10)
        
        self.output_text = tk.Text(root, height=10, width=50)
        self.output_text.pack(pady=10)
        
    def simulate_handwriting(self, text, delay):
        for char in text:
            keyboard.write(char)
            time.sleep(delay)
            
    def start_handwriting(self):
        text = self.text_entry.get()
        try:
            delay = float(self.delay_entry.get())
        except ValueError:
            self.output_text.insert(tk.END, "Invalid delay input.\n")
            return
        
        if text:
            self.output_text.delete("1.0", tk.END)
            self.output_text.insert(tk.END, f"Start typing in your code editor in 5 seconds...\n")
            thread = threading.Thread(target=self.delayed_handwriting, args=(text, delay))
            thread.start()
            
    def delayed_handwriting(self, text, delay):
        time.sleep(5)  # Wait for 5 seconds
        self.simulate_handwriting(text, delay)
        self.output_text.insert(tk.END, "Done!\n")
        
if __name__ == "__main__":
    root = tk.Tk()
    app = HandwritingApp(root)
    root.mainloop()
