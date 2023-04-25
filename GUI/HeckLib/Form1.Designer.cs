
namespace HeckLib
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.updateButton = new System.Windows.Forms.Button();
            this.initButton = new System.Windows.Forms.Button();
            this.heckLibLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // updateButton
            // 
            this.updateButton.Location = new System.Drawing.Point(219, 378);
            this.updateButton.Name = "updateButton";
            this.updateButton.Size = new System.Drawing.Size(365, 48);
            this.updateButton.TabIndex = 0;
            this.updateButton.Text = "Update Files";
            this.updateButton.UseVisualStyleBackColor = true;
            this.updateButton.Click += new System.EventHandler(this.UpdateButton_Click);
            // 
            // initButton
            // 
            this.initButton.Location = new System.Drawing.Point(219, 302);
            this.initButton.Name = "initButton";
            this.initButton.Size = new System.Drawing.Size(365, 48);
            this.initButton.TabIndex = 1;
            this.initButton.Text = "Initialize Project";
            this.initButton.UseVisualStyleBackColor = true;
            this.initButton.Click += new System.EventHandler(this.InitButton_Click);
            // 
            // heckLibLabel
            // 
            this.heckLibLabel.AutoSize = true;
            this.heckLibLabel.Font = new System.Drawing.Font("Dubai", 48F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.heckLibLabel.Location = new System.Drawing.Point(201, 36);
            this.heckLibLabel.Name = "heckLibLabel";
            this.heckLibLabel.Size = new System.Drawing.Size(384, 108);
            this.heckLibLabel.TabIndex = 2;
            this.heckLibLabel.Text = "HeckLib GUI";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.heckLibLabel);
            this.Controls.Add(this.initButton);
            this.Controls.Add(this.updateButton);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button updateButton;
        private System.Windows.Forms.Button initButton;
        private System.Windows.Forms.Label heckLibLabel;
    }
}

