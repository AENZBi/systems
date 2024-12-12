export class CodeGenerator {
  static generateAppCode(screens) {
    const layoutXmls = screens.map(screen => this.generateLayoutXml(screen)).join('\n\n')
    const javaCode = this.generateJavaCode(screens)

    return `
// Layout XML files
${layoutXmls}

// Java files
${javaCode}
    `
  }

  static generateLayoutXml(screen) {
    const xmlComponents = screen.components.map(component => {
      switch (component.type) {
        case 'Button':
          return `
    <Button
        android:id="@+id/button${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp"
        android:text="${component.text || 'Button'}" />`
        case 'TextView':
          return `
    <TextView
        android:id="@+id/textView${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp"
        android:text="${component.text || 'Text View'}" />`
        case 'ImageView':
          return `
    <ImageView
        android:id="@+id/imageView${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp"
        android:src="@drawable/placeholder" />`
        case 'EditText':
          return `
    <EditText
        android:id="@+id/editText${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp"
        android:hint="Enter text" />`
        case 'CheckBox':
          return `
    <CheckBox
        android:id="@+id/checkBox${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp"
        android:text="${component.text || 'CheckBox'}" />`
        case 'RadioButton':
          return `
    <RadioButton
        android:id="@+id/radioButton${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp"
        android:text="${component.text || 'RadioButton'}" />`
        case 'ProgressBar':
          return `
    <ProgressBar
        android:id="@+id/progressBar${component.id}"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp" />`
        case 'ListView':
          return `
    <ListView
        android:id="@+id/listView${component.id}"
        android:layout_width="${component.width}dp"
        android:layout_height="${component.height}dp"
        android:layout_marginLeft="${component.left}dp"
        android:layout_marginTop="${component.top}dp" />`
        default:
          return ''
      }
    }).join('\n')

    return `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
${xmlComponents}
</RelativeLayout>`
  }

  static generateJavaCode(screens) {
    const activityCode = screens.map(screen => this.generateActivityCode(screen)).join('\n\n')
    const mainActivityCode = this.generateMainActivityCode(screens)

    return `package com.example.generatedapp;

import android.os.Bundle;
import android.content.Intent;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.ImageView;
import android.widget.EditText;
import android.widget.CheckBox;
import android.widget.RadioButton;
import android.widget.ProgressBar;
import android.widget.ListView;
import androidx.appcompat.app.AppCompatActivity;

${mainActivityCode}

${activityCode}
`
  }

  static generateMainActivityCode(screens) {
    const navigationButtons = screens
      .filter(screen => screen.id !== 'main')
      .map(screen => `
        Button btn${screen.id} = findViewById(R.id.button${screen.id});
        btn${screen.id}.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, ${screen.name.replace(/\s+/g, '')}Activity.class);
                startActivity(intent);
            }
        });`).join('\n')

    return `public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

${navigationButtons}
    }
}`
  }

  static generateActivityCode(screen) {
    const componentDeclarations = screen.components.map(component => {
      switch (component.type) {
        case 'Button':
          return `    private Button button${component.id};`
        case 'TextView':
          return `    private TextView textView${component.id};`
        case 'ImageView':
          return `    private ImageView imageView${component.id};`
        case 'EditText':
          return `    private EditText editText${component.id};`
        case 'CheckBox':
          return `    private CheckBox checkBox${component.id};`
        case 'RadioButton':
          return `    private RadioButton radioButton${component.id};`
        case 'ProgressBar':
          return `    private ProgressBar progressBar${component.id};`
        case 'ListView':
          return `    private ListView listView${component.id};`
        default:
          return ''
      }
    }).join('\n')

    const componentInitializations = screen.components.map(component => {
      switch (component.type) {
        case 'Button':
          return `        button${component.id} = findViewById(R.id.button${component.id});`
        case 'TextView':
          return `        textView${component.id} = findViewById(R.id.textView${component.id});`
        case 'ImageView':
          return `        imageView${component.id} = findViewById(R.id.imageView${component.id});`
        case 'EditText':
          return `        editText${component.id} = findViewById(R.id.editText${component.id});`
        case 'CheckBox':
          return `        checkBox${component.id} = findViewById(R.id.checkBox${component.id});`
        case 'RadioButton':
          return `        radioButton${component.id} = findViewById(R.id.radioButton${component.id});`
        case 'ProgressBar':
          return `        progressBar${component.id} = findViewById(R.id.progressBar${component.id});`
        case 'ListView':
          return `        listView${component.id} = findViewById(R.id.listView${component.id});`
        default:
          return ''
      }
    }).join('\n')

    return `public class ${screen.name.replace(/\s+/g, '')}Activity extends AppCompatActivity {

${componentDeclarations}

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_${screen.name.toLowerCase().replace(/\s+/g, '_')});

${componentInitializations}

        // Add any additional logic or event listeners here
    }
}`
  }
}
